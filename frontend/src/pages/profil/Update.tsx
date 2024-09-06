import { Link,useNavigate,useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import {API_URL} from "./../../utils/api"

export default function Update () {
    let { userId } = useParams();
    userId= userId==undefined? "" : userId
    const token = window.localStorage.getItem("token")

    const navigate =  useNavigate()
    const [firstName,setFirstName] =  useState('')
    const [lastName,setLastName] =  useState('')
    const [error,setError] =  useState("")
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

            setFirstName(result?.data?.firstname)
            setLastName(result?.data?.lastname)
          });
    },[token])

    async function onSubmit(e:any) {
        e.preventDefault();
        if (firstName==='' || lastName==="") {
            setError("Empty field detected")
            return
        }
        const resp = await fetch(
            `${API_URL}/users/${userId}`,
            {
              method: "PUT",
              headers: {
                "Content-type": "application/json",
                token: token|| ""
              },
              body: JSON.stringify({
                firstname: firstName,
                lastname:lastName
            }),
            }
          );

          const data =  await resp.json()

          if (data?.success) {
            navigate(`/profil/${data?.data?.id}`)
          }

    }

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
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Modifier les informations de compte
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={onSubmit} className="space-y-6">
            {error && <p className="text-red-500">{error}</p>}
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
        <div className="flex items-center justify-between">
          <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
            First name
          </label>
          </div>
          <div className="mt-2">
            <input
              id="first-name"
              name="first-name"
              type="text"
              autoComplete="given-name"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
        <div className="flex items-center justify-between">
          <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
            Last name
          </label>
          </div>
          <div className="mt-2">
            <input
              id="last-name"
              name="last-name"
              type="text"
              autoComplete="family-name"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        </div>
          
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Modifier            
            </button>
          </div>
        </form>
      </div>
    </div>
    </Layout>
        
    )


}