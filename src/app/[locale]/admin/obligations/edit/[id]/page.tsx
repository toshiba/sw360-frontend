'use client'
import { HttpStatus, Obligation } from '@/object-types'
import MessageService from '@/services/message.service'
import CommonUtils from '@/utils/common.utils'
import { ApiUtils } from '@/utils/index'
import { getSession, signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { PageButtonHeader } from 'next-sw360'
import { notFound, useRouter } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'
import ObligationForm from '../../components/AddOrEditObligation'

interface Context {
    params: { id: string }
}

function EditObligation({ params }: Context): ReactNode {
    const obligationId = params.id
    const t = useTranslations('default')
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [obligation, setObligation] = useState<Obligation>({
        id: obligationId,
        title: '',
        text: '',
        obligationLevel: '',
        obligationType: '',
    } as Obligation)

    useEffect(() => {
        void(async () => {
            try {
                setIsLoading(true)
                const session = await getSession()
                if (CommonUtils.isNullOrUndefined(session)) return signOut()
                
                const response = await ApiUtils.GET(`obligations/${obligationId}`, session.user.access_token)
                if(response.status === HttpStatus.OK) {
                    const data = await response.json() as Obligation
                    if (Object.keys(data).length > 0) {
                        setObligation(prev => ({ id: prev.id, ...data }))
                    } else {
                        MessageService.error(t('Failed to load obligation data'))
                    }
                } else {
                    notFound()
                }
            } catch(e) {
                console.error(e)
                MessageService.error(t('Error loading obligation'))
            } finally {
                setIsLoading(false)
            }
        })()
    }, [obligationId, t])

    const isFieldValid = (field: string | null | undefined): boolean =>
        field !== null && field !== undefined && field.trim() !== ''

    const submitObligation = async () => {
        const session = await getSession()
        if (CommonUtils.isNullOrUndefined(session)) return
        console.log(obligation)

        if (
            !isFieldValid(obligation.title) ||
            !isFieldValid(obligation.text) ||
            !isFieldValid(obligation.obligationLevel) ||
            !isFieldValid(obligation.obligationType)
        ) {
            MessageService.error(t('Please fill in all fields before submitting.'))
            return
        }
        const response = await ApiUtils.PATCH(`obligations/${obligationId}`, obligation, session.user.access_token)
        if (response.status == HttpStatus.CREATED) {
            MessageService.success(t('Obligation updated successfully'))
            router.push('/admin/obligations')
        } else if (response.status == HttpStatus.CONFLICT) {
            MessageService.error(t('Obligation text has already taken'))
        } else {
            MessageService.error(t('Update obligation failed'))
        }
    }

    const headerButtons = {
        'Create Obligation': {
            type: 'primary',
            link: `/admin/obligations/edit/${obligationId}`,
            name: t('Update Obligation'),
            onClick: submitObligation,
        },
        Cancel: {
            type: 'secondary',
            link: '/admin/obligations',
            name: t('Cancel'),
        },
    }

    return (
        <div className='container page-content'>
            <div className='row'>
                <div className='col-12'>
                    <div className='row mb-3'>
                        <PageButtonHeader buttons={headerButtons} />
                    </div>

                    {isLoading ? (
                        <div>Fetching data...</div>
                    ) : (
                        <ObligationForm
                            obligation={obligation}
                            setObligation={setObligation}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default EditObligation
