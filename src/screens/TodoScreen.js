import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, updateTodo,toggleTodoStatus } from "../redux/reducers/todoReducer";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";
const TodoScreen  =()=>{
    //1. Khai báo các state để thực hiện thêm
    const [title, setTitle] = useState('');
   
    //lấy  danh sách dữ liệu
    const  listTodo =  useSelector(state=>state.listTodo.listTodo);
    // lấy đối tượng để điều khiển các action
    const dispatch = useDispatch();// của redux
    // hàm xử lý việc thêm
    const handleAddTodo = ()=>{
        let duLieuThem = { id: Math.random().toString(), title: title };
        dispatch( addTodo ( duLieuThem )  );
    }
    //xử lý hàm xóa
    const handleDeleteTodo = (id)=>{
        dispatch(deleteTodo (id));
    }


    // Dành cho sửa: Cần có state lưu trạng thái đang sửa bản ghi nào
  const [editTitle, setEditTitle] = useState('');// chuỗi tiêu đề
  const [idEdit, setIdEdit] = useState(null); //lưu id bản ghi cần sửa
  //viet ham tuowng tac sua
  const handleEdit = (id, title) =>{
    // hàm này để  ẩn hiện form sửa
    setEditTitle(title);
    setIdEdit(id);
}
// hàm lưu kết quả sửa
const handleUpdate =()=>{
    if(editTitle.trim() !== ''){
        // có nội dung sửa
        dispatch( updateTodo ({id: idEdit, title: editTitle }) );
        setEditTitle('');
        setIdEdit(null);
    }
}
//sử lý action trạng thái
const handleToggleTodo = id => {
    dispatch(toggleTodoStatus(id));
};


    return (
        <View>
        <TextInput placeholder="Nhập công việc" onChangeText={setTitle} />
        <View style={{width:100}}>
            <Button title="Thêm việc" onPress={handleAddTodo} />
        </View>
        {/* in danh sách todo: */}
        {
            listTodo.map(row =>(
              <View key={row.id}
               style={{margin:10,padding:10, borderColor:'blue', borderWidth:1}}>
               
                {
                    (idEdit === row.id)?
                        (<>
                            <TextInput
                                    value={editTitle}
                                    onChangeText={setEditTitle}
                                    onBlur={handleUpdate}
                                    autoFocus
                                />
                                <Button title="Update" onPress={handleUpdate} />
                        </>
                        )
                    :
                        (
                            <>
                              <Text>{row.title}  -  {row.id}</Text>
                                <TouchableOpacity onPress={()=>handleDeleteTodo(row.id)} >
                                    <Text style={{color: 'red'}}>Xóa</Text>
                                </TouchableOpacity>

                  {/* trạng thái nút */}
                                
                  <TouchableOpacity onPress={() => handleToggleTodo(row.id)}>
              {row.status ?
                 <Text style={{ color: 'gray' }}>Completed</Text> :
                    <Text style={{ color: 'green' }}>Working</Text>
               }
</TouchableOpacity>

<TouchableOpacity onPress={() => handleEdit(row.id, row.title)}>
                                    <Text>Edit</Text>
                                </TouchableOpacity>

              

                            </>

                        )
                }
               
              </View> 
            ))
        }
    </View>




    );
}
export default TodoScreen;