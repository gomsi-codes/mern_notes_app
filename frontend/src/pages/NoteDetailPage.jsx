import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import { ArrowLeftIcon, LoaderIcon, Trash2Icon, TrashIcon } from 'lucide-react';

function NoteDetailPage() {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const navigate = useNavigate()

  const{ id } = useParams()

  useEffect(()=>{
    const fetchNote = async()=>{
      try {
        const response = await api.get(`/notes/${id}`)
        setNote(response.data)
      } catch (error) {
        console.log('error in fetching note', error);
        toast.error('Failed to fetch the note')
      } finally{
        setLoading(false)
      }
    }
    fetchNote();
  }, [id])


  const handleDelete = async () => {
    if(!window.confirm('Are you sure you want to delete this note')) return;

    try {
      await api.delete(`/notes/${id}`)
      toast.success('Note deleted')
      navigate('/')
    } catch (error) {
      console.log('failed to delete', error);
      toast.error('Failed to delete note')
    }
  }

  const handleSave = async () =>{
    if(!note.title.trim() || !note.content.trim()){
      toast.error('Please add the title and content');
      return;
    }
    setSaving(true)

    try {
      await api.put(`/notes/${id}`, note)
      toast.success('Note updated successfully')
      navigate('/')
    } catch (error) {
      console.log('failed to update', error);
      toast.error('Failed to update note')
    } finally{
      setSaving(false)
    }

  }

  if(loading){
    return(
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon className='animate-spin size-10' />
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className="max-w-2xl mx-auto">
          <div className='flex items-center justify-between mb-6'>
            <Link to='/' className='btn btn-ghost'>
            <ArrowLeftIcon className='h-5 w-5'/>
            Back to Notes
            </Link>
            <button 
            className='btn btn-error btn-outline'
            onClick={handleDelete}
            >
              <Trash2Icon className='h-5 w-5'/>
              Delete Note
            </button>
          </div>
          <div className='card bg-base-100'>
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label block">
                  <span className="label-text">
                    Title
                  </span>
                </label>
                <input 
                  type='text'
                  placeholder='Note title'
                  className='input input-bordered w-full text-xl font-semibold outline-0'
                  value={note.title}
                  onChange={(e) => setNote({...note, title: e.target.value})}
                />
              </div>
              <div className="form-control">
                <label className="label block">
                  <span className="label-text">
                    Content
                  </span>
                </label>
                <textarea 
                  className='textarea textarea-bordered w-full h-44 resize-y text-lg outline-0'
                  placeholder='Write your note here...'
                  value={note.content}
                  onChange={(e)=>setNote({...note, content: e.target.value})}
                />
              </div>

              <div className="card-actions justify-end">
                <button className='btn btn-primary' disabled={saving} onClick={handleSave}>
                  {saving? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage
