import axios from "axios";
const Data =[
    {
        id: "1",
        candidate_name: "Shourya",
        candidate_password: "abcde",
        candidate_email: "tech@gmail.com",
        candidate_profilePic: "image.png",
        candidate_contact_number: "128128172",
        candidate_address: "satellite",
    },
    {
        id: "2",
        candidate_name: "Yagnesh",
        candidate_password: "yascbna",
        candidate_email: "tech@gmail.com 2",
        candidate_profilePic: "85",
        candidate_contact_number: "65654654",
        candidate_address: "ranip",
    },
    {
        id: "3",
        candidate_name: "aksnc",
        candidate_password: "sdmoc",
        candidate_email: "tech@gmail.com 3",
        candidate_profilePic: "67",
        candidate_contact_number: "894163",
        candidate_address: "mvopds",
    },
    {
        id: "4",
        candidate_name: "idoivmd",
        candidate_password: "dsvmxov",
        candidate_email: "tech@gmail.com 4",
        candidate_profilePic: "97",
        candidate_contact_number: "4685465",
        candidate_address: "gota",
    },
]

export const data_company_main = async()=>{
    try {
        const respo = await axios.get("http://localhost:5001/admin/getAllCandidates");
        return respo
//   console.log('respo',respo.data)
    } catch (error) {
        console.log(error)
    }
}

export default Data;