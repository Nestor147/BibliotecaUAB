import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function RangoFechas() {
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);

  const minStartDate = new dayjs(new Date(2023, 4, 1));

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setEndDate(null);
  };

  const handleEndDateChange = (date) => {
    if (date >= startDate) {
      setEndDate(date);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker label="Desde" value={startDate} minDate={minStartDate} onChange={handleStartDateChange}/>
      <DatePicker label="Hasta" value={endDate} disabled={startDate===null} onChange={handleEndDateChange} minDate={startDate}/>
    </LocalizationProvider>
  );
}
