import React, { useState } from 'react';
import './App.css';
import Grid from './pages/Grid'
import Sidebar from './pages/Sidebar';
import PropertiesTab from './components/PropertiesTab';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const appStyles = {
  height: "100vh",
  width:"100vw",
  display: "flex",
  justifyContent:"space-between",
}

function App() {
  const [grid, setGrid] = useState(() => {
    const initialGrid = Array.from({ length: 62 }, () =>
      Array.from({ length: 42 }, () => ({ value: '', rowspan: 1, colspan: 1, color: 'white' }))
    );
    return initialGrid;
  });
  const [selectedCell, setSelectedCell] = useState(null);
  const [startPos, setStartPos] = useState(null);
  const [endPos, setEndPos] = useState(null);
  const [prevStartPos, setPrevStartPos] = useState(null);
  const [prevEndPos, setPrevEndPos] = useState(null);
  const notifySuccess = () => toast.success("Image added sucessfully!");
  const notifyMergeError = () => toast.error("Operation not allowed!");

  const handleCellClick = (row, col) => {
    if (!selectedCell) {
      setSelectedCell({ row, col });
    } else {
        //setSelectedCell(null);
    }
  };

  const mergeCells = () => {
    if (prevStartPos && prevEndPos){ 
      let rowspan = prevEndPos.row - prevStartPos.row + 1;
      let colspan = prevEndPos.col - prevStartPos.col + 1;
      for (let i = prevStartPos.row; i <= prevEndPos.row; i++) {
        for (let j = prevStartPos.col; j <= prevEndPos.col; j++) {
        if(grid[i][j]?.colspan > 1)
        { if(grid[i][j]?.colspan > colspan){
          notifyMergeError()
          return;
         }}
         if(grid[i][j]?.rowspan > 1)
        { if(grid[i][j]?.rowspan > rowspan){
          notifyMergeError()
          return;
         }}       
        }
      }
      setGrid(prevGrid => {
      const newGrid = [...prevGrid];
      newGrid[prevStartPos.row][prevStartPos.col] = { value: "", rowspan, colspan, color:  grid[prevStartPos.row][prevStartPos.col].color };
      for (let i = prevStartPos.row; i <= prevEndPos.row; i++) {
        for (let j = prevStartPos.col; j <= prevEndPos.col; j++) {
         if(!(i===prevStartPos.row&&j===prevStartPos.col)){ 
          newGrid[i][j] = null;
         }
        }
      }

      return newGrid;
    });}
  };

  const handleMouseDown = (row, col) => {
   if(prevStartPos && prevEndPos){
    setGrid(prevGrid => {
      const newGrid = [...prevGrid];
      for (let i = prevStartPos.row; i <= prevEndPos.row; i++) {
        for (let j = prevStartPos.col; j <= prevEndPos.col; j++) {
        if(grid[i][j]!==null)
          { newGrid[i][j] = { value: grid[i][j].value, rowspan: grid[i][j].rowspan, colspan: grid[i][j].colspan, color: 'white' };}
      }
      }       
      return newGrid;
    });
   }
    setStartPos({ row, col });
    setEndPos({ row, col });
    setPrevStartPos({ row, col });
    setPrevEndPos({ row, col });
    setSelectedCell({ row, col });
  };

  const handleMouseEnter = (row, col) => {
    if (startPos) {
      const prevEndCol = endPos.col;
      const prevEndRow = endPos.row;
      setEndPos({ row, col });
      setPrevEndPos({ row, col });
      setGrid(prevGrid => {
        const newGrid = [...prevGrid];
        for (let i = startPos.row; i <= prevEndRow; i++) {
          for (let j = startPos.col; j <= prevEndCol; j++) {
            if(grid[i][j]!==null)
            {newGrid[i][j] = { value: grid[i][j].value, rowspan: grid[i][j].rowspan, colspan: grid[i][j].colspan, color: 'white' };}
          }
        }      
        for (let i = startPos.row; i <= row; i++) {
          for (let j = startPos.col; j <= col; j++) {
            if(grid[i][j]!==null)
           { newGrid[i][j] = { value: grid[i][j].value, rowspan: grid[i][j].rowspan, colspan: grid[i][j].colspan, color: 'blue' };}
          }
        }
        return newGrid;
      });
    }
  };

  const handleMouseUp = () => {
    if (startPos && endPos) {
      console.log(startPos)
      setStartPos(null);
      setEndPos(null);
    }
  };

  const handleCapture = ({ target }) => {
    const height =  (grid[selectedCell.row][selectedCell.col].rowspan * 20) + "px"
    const width =  (grid[selectedCell.row][selectedCell.col].colspan * 20)  + "px"
    console.log(height)
    console.log(width)
    setGrid(prevGrid => {
      const newGrid = [...prevGrid];  
      grid[selectedCell.row][selectedCell.col] = { value: <div><img style={{height:height, width:width, objectFit:"contain"}} src={URL.createObjectURL(target.files[0])} alt='img'/></div>, rowspan: grid[selectedCell.row][selectedCell.col].rowspan,
         colspan: grid[selectedCell.row][selectedCell.col].colspan, color: grid[selectedCell.row][selectedCell.col].color };        
      return newGrid;
    });
  };
  return (
  
  <>
  <div style={appStyles}>
    <Sidebar mergeCells={mergeCells} handleCapture ={handleCapture}/>
    <PropertiesTab/>
      <Grid grid={grid} selectedCell={selectedCell} handleCellClick={handleCellClick} 
      handleMouseDown={handleMouseDown} handleMouseEnter={handleMouseEnter} handleMouseUp={handleMouseUp} />
      </div>
       <ToastContainer theme='colored' autoClose={2500}/>
  </>
  );
}

export default App;
