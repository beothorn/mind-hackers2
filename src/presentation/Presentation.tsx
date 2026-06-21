import React from 'react';
import { batch } from 'react-redux';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';

import { useAppSelector, useAppDispatch } from '../hooks'
import { selectOpenAiKey, actionSetOpenAiKey, actionSetScreen } from '../appStateSlice';

export function Presentation() {

    const openAiKey = useAppSelector(selectOpenAiKey);
    const dispatch = useAppDispatch()
    const [openAiKeyInputValue, setOpenAiKey] = React.useState(openAiKey);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOpenAiKey(event.target.value);
    };

    const updateKey = () => {
        batch(() => {
            dispatch(actionSetOpenAiKey(openAiKeyInputValue));
            dispatch(actionSetScreen('testOpenAiToken'));
        })
    }

    return <>
        <Typography variant="h6" gutterBottom>
            An experiment with a cost-efficient GPT model
        </Typography>
        <Typography variant="body1" gutterBottom>
            A simulation where you are having dinner with a friend.
        </Typography>
        <Typography variant="body1" gutterBottom>
            There are two goals, get your friend to pay for the dinner (including a good tip) and get a key for the employees only bathroom.
            There is a fixed list of possible interactions, but you can insert a thought inside the other persons head on each interaction.
            The insertion is a sentence of maximum 5 words and will work only sometimes.
        </Typography>
        <Typography variant="body1" >
            You will need an OpenAI API key, as the game sends Responses API requests from your browser.
        </Typography>
        <Typography variant="body1">
            If you don't have one, you can get one  <Link href="https://platform.openai.com/api-keys" underline="none">here</Link>.
        </Typography>
        <Typography sx={{marginBottom: '1rem'}} variant="body1">
            And if you want to look at the source code, it is <Link href="https://github.com/beothorn/mind-hackers" underline="none">here</Link>.
        </Typography>
        <TextField
            value={openAiKeyInputValue}
            onChange={handleChange}
            required size="small"
            id="open-ai-key"
            label="OpenAI key"
            variant="outlined"
        />
        <Button sx={{marginLeft: 1}} variant="contained" onClick={updateKey}>Ok</Button>
    </>;
}
