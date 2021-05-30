import React from "react";

const TodoApp = () => {
    const [allTasks, setAllTask]= React.useState([]); //react hooks...

    const addNewTask = () => {
        var task = document.getElementById("task");
        if(task.value.length > 4) {
        setAllTask([{title: task.value },...allTasks]);  //spread operator...    
        var formData = new FormData();
        formData.set("title", task.value);
        formData.set("isCompleted", false);
        
        fetch("http://localhost:5000/create-new-task",{
          method: "POST",
          body: formData,
        });
        task.value = "";
        }else{
            alert("Please Enter min 5 Char....");
        }
    };

    const getAllTasksfromServer = () => {
       fetch("http://localhost:5000/all-tasks")
       .then((res) => res.json())
       .then((res) => {
           setAllTask(res.allTasks);
       }); 
    };

    const deleteTask = (taskId) => {
       var formData = new FormData();
       formData.set("taskId", taskId);
       fetch("http://localhost:5000/delete-task",{
          method: "POST",
          body: formData,
        }).then(() => {
            getAllTasksfromServer();
        });
    };

    React.useEffect(() => {
        getAllTasksfromServer();
    },[]);
    

    return(
        <div>
            <center>
                <h2> Manage your tasks</h2>
                <div style={{alignItems:" center"}} >
                    <input   
                    id = "task"
                    style={{
                        border: "none",
                        height: "20px", 
                        width: "200px",
                        paddingTop: "0px",
                    }}
                    placeholder="Enter your New Task"
                    />
                <button  
                   style= {{button:" none", backgroundColor: "white",}}
                 onClick={addNewTask}
                 >
                    <img  
                      style= {{ width: "20px",height: "20px" }}
                      src="http://pngimg.com/uploads/paper_plane/paper_plane_PNG61.png"
                    />
                </button>
                </div>
           
                <div>
                    {
                        allTasks.map((task,index) => {
                            return(
                                <div style= {{
                                    height:" 40px",
                                    marginTop: "10px",
                                    width:"500px", 
                                    backgroundColor: "#2C3E50", 
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    display: "flex",
                                    color: "white",
                                    paddingLeft: "10px",
                                    borderRadius: "10px",
                                 }}
                                 > 
                                 
                                 <p>
                                     {index +1} - {task.title}
                                 </p>
                                 <div style = {{
                                     backgroundColor: "white",
                                     width: "25px",
                                     height: "25px",
                                     borderRadius: "50%",
                                     alignItems: "center",
                                     justifyContent: "center",
                                     display: "flex",
                                     marginRight: "10px",
                                     cursor: "pointer",
                                    
                                           }}
                                           onClick={ ()=> deleteTask(task._id)}
                                           >
                                 <img 
                                         width = {15}
                                        height = {15}
                                           src="https://toppng.com/uploads/preview/recycling-bin-vector-delete-icon-png-black-11563002079w1isxqyyiv.png" 
                                   />
                                   </div>
                                </div>                
                         );
                    })}
                </div>
            </center>
        </div>
    );
};

export default TodoApp;
