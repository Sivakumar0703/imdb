import React from 'react'
import InputComponent from '../newPersonInputComponent/inputComponent'

const Modal = () => {

    function savePerson(){

    }

  return (
    <div>

        {/* modal */}
        <div className="modal fade" id="addPersonModal" tabIndex="-1" aria-labelledby="addPersonModalLabel" aria-hidden="true">
         <div className="modal-dialog">
           <div className="modal-content">
             <div className="modal-header">
               <h1 className="modal-title fs-5" id="addPersonModalLabel">Create New Person</h1>
               <button id="close-the-modal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
             </div>
             <div className="modal-body">
                <InputComponent />
             </div>
             {/* <div className="modal-footer">
               <button type="button" className="btn btn-success" onClick={savePerson} data-bs-dismiss="modal">POST</button>
               <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
             </div> */}
           </div>
         </div>
        </div>

    </div>
  )
}

export default Modal