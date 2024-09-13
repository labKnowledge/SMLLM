import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Paper, 
  Typography, 
  List, 
  ListItem, 
  CircularProgress 
} from '@mui/material';
import { styled } from '@mui/system';
import { Send as SendIcon } from 'lucide-react';
import { streamChat } from '../api/ai_api';
import OpenAI from 'openai';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '80vh',
  display: 'flex',
  flexDirection: 'column',
}));

const ChatList = styled(List)(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  marginBottom: theme.spacing(2),
}));

const MessageItem = styled(ListItem)<{ align: 'left' | 'right' }>(({ theme, align }) => ({
  flexDirection: 'column',
  alignItems: align === 'left' ? 'flex-start' : 'flex-end',
  marginBottom: theme.spacing(1),
}));

const MessageBubble = styled(Paper)<{ isUser: boolean }>(({ theme }) => ({
  padding: theme.spacing(1, 2),
  borderRadius: 16,
  maxWidth: '70%',
  '& pre': {
    margin: 0,
    padding: theme.spacing(1),
    borderRadius: 4,
  },
  '& code': {
    fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
  },
}));

export interface Message {
  role: 'system' | 'user' | 'assistant' | 'function';
  content: string;
  name?: string;
  function_call?: {
    name: string;
    arguments: string;
  };
}

const LetChatSmall: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([{role: "system", 
    content: 
    import.meta.env.VITE_SYSTEM_MESSAGE}]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const assistantMessage: Message = { role: 'assistant', content: '' };
      setMessages((prev) => [...prev, assistantMessage]);

      let fullContent = '';
      await streamChat([...messages, userMessage] as OpenAI.Chat.ChatCompletionMessageParam[], (chunk) => {
        fullContent += chunk;
        setMessages((prev) => {
          const updatedMessages = [...prev];
          const lastMessage = updatedMessages[updatedMessages.length - 1];
          if (lastMessage.role === 'assistant') {
            lastMessage.content = fullContent;
          }
          return updatedMessages;
        });
      });
    } catch (error) {
      console.error('Error in chat:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StyledPaper elevation={3}>
      <Typography variant="h5" gutterBottom>
        Chat with AI
      </Typography>
      <ChatList ref={chatListRef}>
        {messages.map((message, index) => (
          <MessageItem key={index} align={message.role === 'user' ? 'right' : 'left'}>
            <MessageBubble isUser={message.role === 'user'}>
              {message.role === 'user' ? (
                <Typography variant="body1">{message.content}</Typography>
              ) : (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({node, className, children, ...props}) {
                      const match = /language-(\w+)/.exec(className || '')
                      return  match ? (
                        <SyntaxHighlighter
                          children={String(children).replace(/\n$/, '')}
                          style={tomorrow}
                          language={match[1]}
                          PreTag="div"
                        />
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      )
                    }
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              )}
            </MessageBubble>
          </MessageItem>
        ))}
      </ChatList>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          endIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
          disabled={isLoading || !input.trim()}
          sx={{ ml: 1, height: '56px' }}
        >
          Send
        </Button>
      </Box>
    </StyledPaper>
  );
};

export default LetChatSmall;