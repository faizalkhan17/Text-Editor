import {
  HtmlEditor,
  Inject,
  RichTextEditorComponent,
  Toolbar,
  Image,
  Link
} from '@syncfusion/ej2-react-richtexteditor';

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import '../App.css';
import './RichEditor.css';

function RichEditor() {

    const { id } = useParams();
      const navigate = useNavigate();
    
      const [content, setContent] = useState("");


  const toolbarSettings = {
    items: [
      'Bold', 'Italic', 'Underline', 'StrikeThrough',
      'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
      'LowerCase', 'UpperCase', '|',
      'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
      'Outdent', 'Indent', '|',
      'CreateLink', 'Image', '|',
      'ClearFormat', 'Print',
      'SourceCode', 'FullScreen', '|',
      'Undo', 'Redo'
    ]
  };



  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(`http://localhost:3000/posts/${id}`);

      console.log(res.data);

      setContent(res.data.content || "");
    };

    fetchPost();
  }, [id]);


   const handlePublish = async () => {
    await axios.put(`http://localhost:3000/posts/${id}`, {
      content,
      status: "publish",
    });

    navigate("/feed");
  };



  return (

    <div className="editor-container">

        <RichTextEditorComponent
       height={500}
       width={800}
       value={content} 
       change={(e) => setContent(e.value)}
      toolbarSettings={toolbarSettings}
    >
      <Inject services={[Toolbar, Image, Link, HtmlEditor]} />
      
    </RichTextEditorComponent>

     <button className="publish-btn" onClick={handlePublish}>Publish</button>

    </div>
    
  );
}

export default RichEditor;