import React, { useState, FormEvent } from 'react';
import { Button, TextField, Paper, Typography, CircularProgress, Snackbar, Box } from '@mui/material';
import { styled } from '@mui/system';
import { Send as SendIcon } from 'lucide-react';
import { completeCall } from '../api/ai_api';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    backgroundColor: '#f5f5f5',
    borderRadius: '15px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
}));

const Form = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
}));

const GeneratedContent = styled(Typography)(({ theme }) => ({
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    border: '1px solid #e0e0e0',
}));

interface OpenAIResponse {
    choices: Array<{
        text: string;
    }>;
}

const ContentCreator: React.FC = () => {
    const [prompt, setPrompt] = useState<string>('');
    const [generatedPost, setGeneratedPost] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        completeCall(prompt).then((d)=>{
            setLoading(false);
            setGeneratedPost(d.choices[0].message.content)
        })
       
    };

    return (
        <StyledPaper elevation={3}>
            <Typography variant="h4" gutterBottom>
                Small Language Model Acting Big
            </Typography>
            <Form onSubmit={handleSubmit}>
                <TextField
                    label="Enter your prompt"
                    variant="outlined"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    multiline
                    rows={3}
                    fullWidth
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading || !prompt}
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                >
                    Generate Post
                </Button>
            </Form>
            {generatedPost && (
                <Box mt={2}>
                    <GeneratedContent variant="body1">
                        {generatedPost}
                    </GeneratedContent>
                </Box>
            )}
            <Snackbar
                open={!!error}
                autoHideDuration={6000}
                onClose={() => setError('')}
                message={error}
            />
        </StyledPaper>
    );
};

export default ContentCreator;