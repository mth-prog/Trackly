// import { JSX } from 'react'
// function CreateHabits(): JSX.Element {
//   return (
//     <>
//       <h1>Oi</h1>
//     </>
//   )
// }

// export default CreateHabits


import { FunctionComponent } from "react";

interface CreateHabitsProps {
    
}
 
const CreateHabits: FunctionComponent<CreateHabitsProps> = () => {
    return ( 
        <>
            <h1>CreateHabits</h1>
        </> 
    );
}
 
export default CreateHabits;