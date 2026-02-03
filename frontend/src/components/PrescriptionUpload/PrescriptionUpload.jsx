import React, { useState, useRef } from 'react'
import ApiClient from '../../services/ApiClient'

export default function PrescriptionUpload({ orderId = null }){
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState(null);
  const inputRef = useRef(null);

  const onSelect = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    if (f.type.startsWith('image/')){
      const url = URL.createObjectURL(f);
      setPreview(url);
    } else {
      setPreview(null);
    }
  }

  const upload = async () => {
    if (!file) { setMessage('Selecione um ficheiro'); return; }
    setUploading(true); setMessage(null); setProgress(0);
    try {
      const onProgress = (p) => setProgress(Math.round(p*100));
      const res = await ApiClient.uploadPrescription({ file, orderId, onProgress });
      setMessage('Upload concluído com sucesso');
      setFile(null);
      setPreview(null);
      if (inputRef.current) inputRef.current.value = '';
    } catch (err) {
      setMessage(err.message || 'Erro no upload');
    } finally { setUploading(false); setProgress(0); }
  }

  return (
    <div className="pc-prescription-upload">
      <label className="pc-label">Enviar Receita</label>
      <div className="pc-card">
        <input ref={inputRef} type="file" accept="image/*,application/pdf" onChange={onSelect} />
        {preview && <img src={preview} alt="preview" className="pc-preview" />}
        <div className="pc-actions">
          <button className="btn primary" onClick={upload} disabled={uploading}>{uploading ? 'A enviar…' : 'Enviar'}</button>
          <div className="pc-progress" style={{width: `${progress}%`}} aria-hidden="true"></div>
        </div>
        {message && <p className="pc-msg">{message}</p>}
        <p className="pc-hint">Aceitamos JPG, PNG, WEBP ou PDF. Máx {Math.round((window.MAX_UPLOAD_SIZE||5242880)/1024/1024*100)/100} MB.</p>
      </div>
    </div>
  )
}
