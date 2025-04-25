'use client'
import { assets } from '@/assests/assets';
import commonGetApis from '@/commonapi/Commonapi';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const Userid = ({ id }: any) => {
    const [userDetails, setUserDetails] = useState<any>(null);
    const [orders, setOrders] = useState<any[]>([]);

    const fetchUser = async () => {
        try {
            const res = await commonGetApis(`get_user_details?id=${id}`);
            if (res?.data) {
                setUserDetails(res?.data?.result[0]);
                setOrders(res?.data?.result[0]?.order || []);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [id]);

    console.log("User Details:", userDetails);
    console.log("Orders:", orders);

    return (
        <div>
            <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-col px-2'>
                    <h1 className='text-3xl font-bold'>Users Details</h1>
                    <p className='text-gray-500 mt-2'>Dashboard <span className='text-gray-500 ml-5'>Users</span> <span className='text-black ml-5'>Users Details</span></p>
                </div>
            </div>
            <div className='flex flex-row items-center justify-between shadow-lg'>
                <div>
                    <Image src={assets.use} alt='user' height={170} width={150} />
                </div>
                <div className='flex flex-col'>
                    <h1 className='text-black font-bold text-2xl md:mr-60 lg:mr-130 mb-3'>{userDetails?.firstname} {userDetails?.lastname}</h1>
                    <div className='flex flex-row items-center'>
                        <Image src={assets.mobile} alt='mobile' height={8} width={18} className='mb-2' />
                        <p className='ml-2 mb-2'>{userDetails?.mobile_no}</p>
                        <Image src={assets.mails} alt='mail' height={8} width={18} className='mb-2 ml-10' />
                        <p className='ml-2 mb-2'>{userDetails?.email}</p>
                    </div>
                    <div className='flex flex-row items-center'>
                        <Image src={assets.location} alt='address' height={8} width={18} className='mb-2' />
                        <p className='ml-2 mb-2'>{userDetails?.address?.map((address: any, index: number) => (
                            <span key={index}>{address.address_line1}, {address.address_line2} </span>
                        ))}</p>
                    </div>
                </div>
                <div className='flex flex-row mr-15 ml-25 mb-20'>
                    <p className='text-gray-400 '>Total Order: {orders?.length}</p>
                    <p className='text-gray-400 ml-7 font-bold'>Status: <span className='text-black font-bold'>{userDetails.is_active === 0 ? 'Inactive' : 'Active'}</span></p>
                </div>
            </div>
            <div>
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden mt-5">
                    <thead>
                        <tr>
                            <th className="py-3 px-4 text-left text-md font-semibold text-black">Order No.</th>
                            <th className="py-3 px-4 text-left text-md font-semibold text-black">Date</th>
                            <th className="py-3 px-4 text-left text-md font-semibold text-black">User Details</th>
                            <th className="py-3 px-4 text-left text-md font-semibold text-black">Amount</th>
                            <th className="py-3 px-4 text-left text-md font-semibold text-black">Payment Type</th>
                            <th className="py-3 px-4 text-left text-md font-semibold text-black">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map((order: any, index: number) => (
                            <tr key={index}>
                                <td className="py-3 px-4 text-md">{order.order_no}</td>
                                <td className="py-3 px-4 text-md">{new Date(order.created_date).toLocaleDateString()}</td>
                                <td className="py-3 px-4 text-md">{userDetails?.firstname} {userDetails?.lastname}</td>
                                <td className="py-3 px-4 text-md">{order.grand_total}</td>
                                <td className="py-3 px-4 text-md">{order.payment_type === 0 ? 'Cash' : 'Card'}</td>
                                <td className={`py-3 px-4 text-md ${order.order_status === 3 ? "text-green-800" : "text-red-800"}`}>{order.order_status === 3 ? 'Completed' : 'Pending'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='flex justify-end bottom-0 top-100'>
                </div>
            </div>
        </div>
    )
}

export default Userid;
