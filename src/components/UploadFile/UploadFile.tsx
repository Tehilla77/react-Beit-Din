import React, { FC, useEffect, useRef, useState } from 'react';
import './UploadFile.scss';
// import { useNavigate } from 'react-router-dom';
import FileService from '../service/file.service';
import fileService from '../service/file.service';
// import { Message } from 'primereact/message';
// import blogoImg from '../../assets/logo-black.png'
// import bgUrl from '../../assets/pages-bg.png'
// import record from '../../assets/btn-record.png'
// import Loader from '../Loader/Loader';
// import AudioPlayer from '../AudioPlayer/AudioPlayer';

interface UploadFileProps { }

const UploadFile: FC<UploadFileProps> = () => {
  const [uploadedFile, setUploadedFile] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState('');
  const [choice, setChoice] = useState<any>('');
  const [isUpload,setIsUpload] = useState<boolean>(false)
  const [PdfUrl, setPdfUrl] = useState<any>('');


  const uploadInputRef = useRef<any>();
  // const navigate = useNavigate();

  useEffect(() => {
    // getSheffelVegeut();
    if (isUpload){
      console.log('useEffect')
      sendFile();
    }
  }, [uploadedFile])

  const getSheffelVegeut = async() =>{
    try {
      const url = await fileService.getPdfById(1);
      setPdfUrl(url);
      console.log('url');
      console.log(url);
    }
    catch (err) {
      console.error('Error fetching shefel vegeut:', err);
    }
    
  }

  const convertFileListToArr = (songFile: FileList): [] => {
    let array: any = [];
    array.push(songFile.item(0))
    return array;
  }

  const selectedFile = (event: any) => {
    let files: FileList = event.target.files;
    console.log('selectedFile')
    const file = files.item(0);
    if (file?.type == 'application/pdf') {
      let arr = convertFileListToArr(files);
      setUploadedFile([...arr])
      setIsUpload(true)
    }
   
  };

  const sendFile = async () => {
    setIsLoading(true);
    try {
      console.log('sendFile')
      await FileService.sendPdf(uploadedFile);
      // getVocalDrums();
      // getTune()
      // getSongWithoutGuitar();
      setIsLoading(false); // Set isLoading to false after the request finishes
    } catch (err) {
      throw err;
    }
  }

  // const getVocalDrums = async () => {
  //   const vocal = await getSourceFromServer('vocal_drums');
  //   setVocalDrumsUrl(vocal)
  //   console.log("VocalDrumsUrl", vocal)
  // };

  // const getTune = async () => {
  //   const tune = await getSourceFromServer('tune');
  //   setTune(tune)
  //   console.log("tuneUrl", tune)
  // }
  // const getSongWithoutGuitar = async () => {
  //   const song = await getSourceFromServer('song_without_guitar');
  //   setSongWithoutGuitar(song)
  // };

  // const getSourceFromServer = async (req: string) => {
  //   try {
  //     const url = await FileService.getSource(req);
  //     return url;
  //   }
  //   catch (err) {
  //     console.error('Error fetching Audio:', err);
  //   }
  // }

  return <div className="UploadFile" >
    {/* <img src={blogoImg}></img> */}
    <div className='cont'>
      <input style={{ display: 'none' }} ref={uploadInputRef} type='file' onChange={selectedFile} ></input>
      {
        uploadedFile == '' ? <div>
          <div onDragOver={(event) => { event.preventDefault() }} >
            <div className='select-area' onDrag={() => { }} onClick={() => { uploadInputRef.current.click() }}>Drag or Select file</div>
            {/* {errorMessage && <Message severity="error" text={errorMessage} />} */}
            </div>
        </div> :
          <div className='upload-list'> {uploadedFile[0].name}</div>
      }

      {
        PdfUrl!='' ? <div><h1>pdf?</h1><iframe title='dd' src={PdfUrl} width="800" height="500"></iframe></div> : ""
      }

     </div>
  </div>

}

export default UploadFile;
