import '../../styles/NewPitchCount.css'

function NewPitchCount() {
  return (
    <div>
        <form className="form-container">
            <h2>Enter New Pitch Count</h2>
            <div className="selection-container">
              <select className='select'>
                  <option>Select Team</option>
                  <option value="">Team 1</option>
                  <option value="">Team 2</option>
                  <option value="">Team 3</option>
                  <option value="">Team 4</option>
                  <option value="">Team 5</option>
              </select>
              <select className='select'>
                  <option>Select Pitcher</option>
                  <option value="">Player 1</option>
                  <option value="">Player 2</option>
                  <option value="">Player 3</option>
                  <option value="">Player 4</option>
                  <option value="">Player 5</option>
                  <option value="">Player 6</option>
              </select>
              <select className='select'>
                  <option>Select Game</option>
                  <option value="">Game 1</option>
                  <option value="">Game 2</option>
                  <option value="">Game 3</option>
                  <option value="">Game 4</option>
                  <option value="">Game 5</option>
                  <option value="">Game 6</option>
                  <option value="">Game 7</option>
                  <option value="">Game 8</option>
              </select>
            </div>
            
            <div className='pitches'>
              Total Pitches: 
              <input className='form-input-pitches 'type="text" placeholder="#" />
            </div>
            <button className='button' type="submit">Submit</button>
        </form>
    </div>
  )
}

export default NewPitchCount