import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Form, redirect, useFetcher } from 'react-router-dom'

const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }
const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

export async function createAction({request}) {
        const data = await request.formData()
        const values = Object.fromEntries(data)
        const formData = new FormData();

        Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
  });
        const response = await fetch("http://localhost:4000/post", {
          method : "POST",
          body : formData,
          credentials : 'include'
        })

        if(response.ok){
          return redirect('/')
        }
        return null
}

const CreatePost = () => {
  const [content,setContent] = useState('')
  
  const fetcher = useFetcher()
  const submitting = fetcher.state === "submitting"
  return (
    <fetcher.Form method='post' encType="multipart/form-data">
        <input type='text' placeholder='Title' name='title'/>
        <input type="text" placeholder='Summary' name='summary'/>
        <input type="file" name="file"/>
        <ReactQuill theme='snow' modules={modules} formats={formats} value={content} onChange={newValue =>setContent(newValue)}/>
        <input type="hidden" value={content} name='content' />
        <button type='submit' disabled={submitting} style={{marginTop:'5px'}}> {submitting ? "Submitting...":"Create Post" }</button>
    </fetcher.Form>
  )
}

export default CreatePost