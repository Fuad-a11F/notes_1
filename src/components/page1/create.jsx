import "./create.css";
import React from "react";
import Modal from "./modal";
import Title from "./title";
import { useSelector, useDispatch } from "react-redux";
import { main_server_get } from "../../redux/asyncAction";

function Create() {
  let [modal, setModal] = React.useState(false);
  const state = useSelector((state) => state.main.main);
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(main_server_get(localStorage.getItem('token')))
  }, [])

  function close(e) {
    e.stopPropagation();
    setModal(false);
  }

  return (
    <div className="main__row">
        <div className="main__column">
            <button className="create__btn button" onClick={() => setModal(true)}>
            {!modal ? "Create a new board..." : "Creating a board"}
            <div className={modal ? "close" : "close none"}
                onClick={(e) => close(e)}>x</div>
            </button>
            {modal && <Modal setModal={setModal} />}
        </div>
        {state.map(item => {
            return <Title key={item.id} item={item}/>
        })}   
    </div>
  );
}

export default Create;
