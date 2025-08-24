"use client"
import SettingsForm from '@/components/settings-form/SettingsForm';
import { useGetAuthUserQuery, useUpdateManagerSettingsMutation } from '@/state/api'

import React from 'react'
import { email } from 'zod';

const ManagerSettings = () => {
    const {data: authUser, isLoading} = useGetAuthUserQuery();
    const [updateManager] = useUpdateManagerSettingsMutation();
    const initialData = {
        name: authUser?.userInfo.name,
        email: authUser?.userInfo.email,
        phoneNumber: authUser?.userInfo.phoneNumber
    }
    if(isLoading){

    }
    const handleSubmit = async (data: typeof initialData)=>{
        await updateManager({
            cognitoId: authUser?.cognitoInfo.userId,
            ...data,
        })
    }

  return (
    <SettingsForm initialData={initialData} onSubmit={handleSubmit} userType='manager'/>
  )
}

export default ManagerSettings
