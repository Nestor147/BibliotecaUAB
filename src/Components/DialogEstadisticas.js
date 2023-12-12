import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AdminHistIndiv from './AdminHistIndiv';
import { collection, getDocs, query } from 'firebase/firestore';
import { firestoreMiApp } from '../services/firebase-config';
import { Alert, Box, Tab, Tabs, Typography } from '@mui/material';
import PieChart from './PieCarreras';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import PropTypes from 'prop-types';
import PieHorasCarreras from './PieHorasCarreras';

export default function DialogHistorialEst(props) {

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const [open, setOpen] = React.useState(false);
    //const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = () => () => {
        setOpen(true);
        //setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);
    const [value, setValue] = React.useState(0);

    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    return (
        <Box sx={{ mr: 1 }}>
            <Button variant="contained" endIcon={<SignalCellularAltIcon />} onClick={handleClickOpen('paper')}>Estadísticas</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={'paper'}
                maxWidth={false}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Estadísticas</DialogTitle>
                <DialogContent>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Cantidad" {...a11yProps(0)} />
                                <Tab label="Acumulado" {...a11yProps(1)}/>
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <PieChart listaDatos={props.listaDatos} />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <PieHorasCarreras listaDatos={props.listaDatos} />
                        </TabPanel>
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cerrar</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}