import { useState, createContext, useContext, createRef, useEffect } from "react";
import { Button, Text } from "react-native";

const UserContext = createContext();

export default function Component1(){
  const [user, setUser] = useState("Jesse Hall");
  const nchildrens = 3;
  const [array, setArray] = useState([]);
  const [id, setId] = useState(Array.from({ length: nchildrens }, () => createRef()));


  return (
    <UserContext.Provider value={{user, nchildrens, array, setArray}} >
      <Text>{`Hello ${user}!`}</Text>
      <Button 
        title="Delete array"
        onPress={	() => setArray([])	}
      />
      <Component2 />
    </UserContext.Provider>
  );
}

const Component2 = () => {
  const { nchildrens } = useContext(UserContext);

  return (
    <>
      <Text>Component 2</Text>
      <Text>nchildrens: {nchildrens}</Text>
      {Array.from({ length: nchildrens }, (_, i) => (
        <Component3 key={i} index={i} />
      ))}
    </>
  );
}

const Component3 = ({ index }) => {

  const { array, setArray } = useContext(UserContext);

  useEffect(() => {
    setArray((prev)=>[...prev, index]);
  }, []);

  return (
    <>
      <Text>Component 3</Text>
      <Text>Index: {index}</Text>
      <Text>Array: {JSON.stringify(array)}</Text>
      <Component4 />
    </>
  );
}

const Component4 = () => {
  return (
    <>
      <Text>Component 4</Text>
      <Component5 />
    </>
  );
}

const Component5 = () => {
  const { user }= useContext(UserContext);

  return (
    <>
      <Text>Component 5</Text>
      <Text>{`Hello ${user} again!`}</Text>
    </>
  );
}
