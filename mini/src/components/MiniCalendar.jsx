import React, { useState } from 'react';  
import styled from 'styled-components';  
import { format, startOfMonth, endOfMonth, addMonths, subMonths, eachDayOfInterval, isSameDay, startOfWeek, endOfWeek } from 'date-fns';  

const CalendarContainer = styled.div`  
  display: flex;  
  flex-direction: column;  
  align-items: center;  
  width: 100%;  
  max-width: 600px;  
  margin: auto;  
`;  

const Header = styled.div`  
  display: flex;  
  justify-content: space-between;  
  width: 100%;  
  margin-bottom: 20px;  
`;  

const Button = styled.button`  
  padding: 10px;  
  cursor: pointer;  
`;  

const DaysContainer = styled.div`  
  display: grid;  
  grid-template-columns: repeat(7, 1fr);  
  gap: 6px;  
`;  

const Day = styled.div`  
  padding: 15px;  
  text-align: center;  
  border: 1px solid #ccc;  
  cursor: pointer;  
  background-color: ${({ isSelected }) => (isSelected ? '#007bff' : 'white')};  
  color: ${({ isSelected }) => (isSelected ? 'white' : 'black')};  
`;  

const SelectedDateInfo = styled.div`  
  margin-top: 20px;  
`;  

const MiniCalendar = () => {  
  const [currentDate, setCurrentDate] = useState(new Date());  
  const [selectedDate, setSelectedDate] = useState(new Date()); 

  const handlePrevMonth = () => {  
    setCurrentDate(subMonths(currentDate, 1));  
  };  

  const handleNextMonth = () => {  
    setCurrentDate(addMonths(currentDate, 1));  
  };  


  const startDate = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 0 });  
  const endDate = endOfWeek(endOfMonth(currentDate), { weekStartsOn: 0 });  
  const daysToDisplay = eachDayOfInterval({ start: startDate, end: endDate });  

  const handleDateClick = (date) => {  
    setSelectedDate(date);  
  };  

  return (  
    <CalendarContainer>  
      <Header>  
        <Button onClick={handlePrevMonth}>上一个月</Button>  
        <h2>{format(currentDate, 'yyyy年MM月')}</h2>  
        <Button onClick={handleNextMonth}>下一个月</Button>  
      </Header>  
      <DaysContainer>  
        {['日', '一', '二', '三', '四', '五', '六'].map((day) => (  
          <div key={day}>{day}</div>  
        ))}  
        {daysToDisplay.map((date) => (  
          <Day  
            key={date.toString()} 
            isSelected={selectedDate && isSameDay(selectedDate, date)}  
            onClick={() => handleDateClick(date)}  
          >  
            {format(date, 'd')}  
          </Day>  
        ))}  
      </DaysContainer>  
      {selectedDate && (  
        <SelectedDateInfo>  
          当前选择的日期是：{format(selectedDate, 'yyyy-MM-dd')}  
        </SelectedDateInfo>  
      )}  
    </CalendarContainer>  
  );  
};  

export default MiniCalendar;