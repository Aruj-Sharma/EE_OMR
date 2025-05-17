import React, { useEffect, useState } from 'react';

const Grid = ({ grid, selectedCell, handleCellClick, handleMouseDown, handleMouseEnter, handleMouseUp }) => {
 
    return (
        <div style={{height:'100vh', overflow:'auto'}}>
            <table>
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => {
                if (!cell) return null; 
                const isSelected =
                  selectedCell &&
                  (rowIndex === selectedCell.row || colIndex === selectedCell.col);
                return (
                  <td
                  style={ (rowIndex === selectedCell?.row && colIndex === selectedCell?.col)?{border:"2px solid blue"}:{ backgroundColor: cell.color}}
                  height={"20px"} width={"20px"}
                  
                    key={colIndex}
                    rowSpan={cell.rowspan}
                    colSpan={cell.colspan}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                   onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                   onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                   onMouseUp={handleMouseUp}
                    className={isSelected ? 'selected' : ''}
                  >
                    {cell.value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
        </div>
      
    );
  };

  export default Grid;
  
  