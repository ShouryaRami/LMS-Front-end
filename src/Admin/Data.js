import axios from "axios";
 const Data =[
    {
        id: 1,
        company_name: "tech Nishal",
        company_password: "abcde",
        company_email: "tech@gmail.com",
        company_logo: "logol.png",
        company_contact_number: "128128172",
        company_address: "satellite",
    },
    {
        id: 2,
        company_name: "aaa tech Nishal 2",
        company_password: "abcde 2",
        company_email: "tech@gmail.com 2",
        company_logo: "logol.png 2",
        company_contact_number: "1281281722",
        company_address: "satellite 2",
    },
    {
        id: 3,
        company_name: "bbbb tech Nishal 3",
        company_password: "abcde 3",
        company_email: "tech@gmail.com 3",
        company_logo: "logol.png 3",
        company_contact_number: "128128172 3",
        company_address: "satellite 3",
    },
    {
        id: 4,
        company_name: "tech Nishal 4",
        company_password: "abcde 4",
        company_email: "tech@gmail.com 4",
        company_logo: "logol.png 4",
        company_contact_number: "128128172 4",
        company_address: "satellite 4",
    },
    {
        id: 5,
        company_name: "cccc tech Nishal 5",
        company_password: "abcde 5",
        company_email: "tech@gmail.com 5",
        company_logo: "logol.png 5",
        company_contact_number: "128128172 5",
        company_address: "satellite 5",
    },
    {
        id: 6,
        company_name: "tech Nishal 6",
        company_password: "abcde 6",
        company_email: "tech@gmail.com 6",
        company_logo: "logol.png 6",
        company_contact_number: "128128172 6",
        company_address: "satellite 6",
    },
    {
        id: 7,
        company_name: "tech Nishal 7",
        company_password: "abcde 7",
        company_email: "tech@gmail.com 7",
        company_logo: "logol.png 7",
        company_contact_number: "128128172 7",
        company_address: "satellite 7",
    },
    {
        id: 8,
        company_name: "tech Nishal 8",
        company_password: "abcde 8",
        company_email: "tech@gmail.com 8",
        company_logo: "logol.png 8",
        company_contact_number: "128128172 8",
        company_address: "satellite 8",
    },
    {
        id: 9,
        company_name: "tech Nishal 9",
        company_password: "abcde 9",
        company_email: "tech@gmail.com 9",
        company_logo: "logol.png 9",
        company_contact_number: "128128172 9",
        company_address: "satellite 9",
    },
    {
        id: 10,
        company_name: "tech Nishal 10",
        company_password: "abcde 10",
        company_email: "tech@gmail.com 10",
        company_logo: "logol.png 10",
        company_contact_number: "128128172 10",
        company_address: "satellite 10",
    },{
        id: 11,
        company_name: "tech Nishal 11",
        company_password: "abcde 11",
        company_email: "tech@gmail.com 11",
        company_logo: "logol.png 11",
        company_contact_number: "128128172 11",
        company_address: "satellite 11",
    },
]

export const data_main = async()=>{
    try {
        const respo = await axios.get("http://localhost:5001/admin/getAllcompanies");
        return respo
//   console.log('respo',respo.data)
    } catch (error) {
        console.log(error)
    }
}




export default Data;