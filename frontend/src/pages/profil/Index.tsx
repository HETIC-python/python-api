import { useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import {API_URL} from "../../utils/api"

export default function Index () {
    let { userId } = useParams();
    userId= userId==undefined? "" : userId
    const token = window.localStorage.getItem("token")

    const [data, setData] = useState({"firstName": '',
                'lastName' : '',
                'email' : ''})


    useEffect(()=>{
        fetch(
            `${API_URL}/users/${userId}`,
            {
              method: "GET",
              headers: {
                "Content-type": "application/json",
                token: token|| ""
              },
            }
          ).then((res)=>{
            const result:any = res.json()
            return result
          }).then((result:any)=>{
            setData({"firstName": result?.data?.firstname,
                'lastName' : result?.data?.lastname,
                'email' : result?.data?.email
            })
          });
    },[token])

    if (userId=== "") {
        return (
            <Layout userId = {userId}>
                <div>
                connectez-vous
            </div>
            </Layout>
        )
    } 
    return (
        <Layout userId = {userId}>
            <div>
            <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Vos informations de compte</h3>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Nom et prénoms : </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data?.firstName} {data.lastName}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Addresse email</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data.email}</dd>
          </div>
        </dl>
      </div>
    </div>
    </div>
        </Layout>
    )


}

