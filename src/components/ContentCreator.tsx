import React, { useState, FormEvent } from 'react';
import { Button, TextField, Paper, Typography, CircularProgress, Snackbar, Box } from '@mui/material';
import { styled } from '@mui/system';
import { Send as SendIcon } from 'lucide-react';

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

        try {
            // Replace with actual API call
            const response = await fetch('https://openhost-ai.18hbq0.easypanel.host/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [
                        { role: "system", content: "You are SmartAssistant, an AI assistant. Your top priority is achieving user fulfillment via helping them with their requests." },
                        { role: "user", content: prompt }
                    ]
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate post');
            }

            const data: OpenAIResponse = await response.json();
            setGeneratedPost(data.choices[0].text.trim());
        } catch (err) {
            setError('An error occurred while generating the post. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <StyledPaper elevation={3}>
            <Typography variant="h4" gutterBottom>
                OpenAI Post Generator
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