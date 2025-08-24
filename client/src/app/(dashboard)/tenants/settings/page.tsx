"use client"
import SettingsForm from '@/components/settings-form/SettingsForm';
import { useGetAuthUserQuery, useUpdateTenantSettingsMutation } from '@/state/api'

import React from 'react'
import { email } from 'zod';

const TennantSettings = () => {
    const {data: authUser, isLoading} = useGetAuthUserQuery();
    const [updateTenant] = useUpdateTenantSettingsMutation();
    const initialData = {
        name: authUser?.userInfo.name,
        email: authUser?.userInfo.email,
        phoneNumber: authUser?.userInfo.phoneNumber
    }
    if(isLoading){

    }
    const handleSubmit = async (data: typeof initialData)=>{
        await updateTenant({
            cognitoId: authUser?.cognitoInfo.userId,
            ...data,
        })
    }

  return (
    <SettingsForm initialData={initialData} onSubmit={handleSubmit} userType='tenant'/>
  )
}

export default TennantSettings
