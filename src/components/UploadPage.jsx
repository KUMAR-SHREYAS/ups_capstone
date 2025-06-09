import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, Paper, Input, CircularProgress } from '@mui/material';
import { mockOcrApi } from '../utils/api';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    setFile(f);
    if (f && f.type.startsWith('image/')) {
      setPreviewUrl(URL.createObjectURL(f));
    } else {
      setPreviewUrl('');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }
    setLoading(true);
    setError('');
    try {
      // Simulate OCR API call
      const metadata = await mockOcrApi(file);
      // Save metadata to sessionStorage for dashboard
      sessionStorage.setItem('ups_metadata', JSON.stringify(metadata));
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to process file');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Upload UPS Label (Image or PDF)
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Input
            type="file"
            inputProps={{ accept: 'image/*,application/pdf' }}
            onChange={handleFileChange}
            disabled={loading}
          />
          {previewUrl && (
            <Box sx={{ mt: 2 }}>
              <img src={previewUrl} alt="Preview" style={{ maxWidth: 200, maxHeight: 200 }} />
            </Box>
          )}
          {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3, minWidth: 180 }}
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Upload & Extract'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default UploadPage; 