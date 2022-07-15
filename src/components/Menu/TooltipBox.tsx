import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

const TooltipBox = styled(motion.div)`
    background-color: #333;
    color: white;
    font-size: 12px;
    padding: 4px 8px;
    line-height: 1.15;
    border-radius: 3px;
`;

export default TooltipBox;
