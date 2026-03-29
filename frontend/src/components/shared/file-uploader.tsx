'use client';
import * as React from 'react';
import { UploadCloud, CheckCircle2, Loader2, XCircle } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { uploadApi, ocrApi } from '@/lib/api/misc';
import { toast } from 'sonner';

interface FileUploaderProps {
  onUploadSuccess: (url: string) => void;
  onOcrComplete?: (data: any) => void;
  triggerOcr?: boolean;
}

export function FileUploader({ onUploadSuccess, onOcrComplete, triggerOcr }: FileUploaderProps) {
  const [file, setFile] = React.useState<File | null>(null);
  const [status, setStatus] = React.useState<'idle' | 'uploading' | 'processing_ocr' | 'done' | 'error'>('idle');

  const uploadMutation = useMutation({
    mutationFn: (f: File) => uploadApi.upload(f),
    onSuccess: async (data) => {
      onUploadSuccess(data.url);
      if (triggerOcr && onOcrComplete) {
        setStatus('processing_ocr');
        try {
          // create a dummy expense to attach OCR job to, or pass URL to ocr start directly.
          // In this flow, wait for OCR if needed, else just finish.
          // For demo, we just mark done. (proper flow requires expense creation first usually)
          toast.success('File uploaded');
          setStatus('done');
        } catch (e) {
          setStatus('error');
          toast.error('OCR Processing failed');
        }
      } else {
        toast.success('File uploaded');
        setStatus('done');
      }
    },
    onError: () => {
      setStatus('error');
      toast.error('Upload failed');
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setStatus('uploading');
      uploadMutation.mutate(selected);
    }
  };

  return (
    <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center relative bg-muted/20">
      <input
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleFileChange}
        disabled={status === 'uploading' || status === 'processing_ocr'}
      />
      {status === 'idle' && (
        <>
          <UploadCloud className="w-10 h-10 text-muted-foreground mb-4" />
          <p className="text-sm font-medium">Click or drag file to upload receipt</p>
        </>
      )}
      {status === 'uploading' && (
        <div className="flex items-center gap-2 text-blue-500">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Uploading...</span>
        </div>
      )}
      {status === 'processing_ocr' && (
        <div className="flex items-center gap-2 text-yellow-500">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Extracting receipt data...</span>
        </div>
      )}
      {status === 'done' && (
        <div className="flex items-center gap-2 text-green-500">
          <CheckCircle2 className="w-5 h-5" />
          <span>{file?.name} uploaded successfully</span>
        </div>
      )}
      {status === 'error' && (
        <div className="flex items-center gap-2 text-destructive">
          <XCircle className="w-5 h-5" />
          <span>Upload failed. Try again.</span>
        </div>
      )}
    </div>
  );
}
