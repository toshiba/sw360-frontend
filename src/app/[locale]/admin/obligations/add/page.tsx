'use client'
import { HttpStatus, Obligation } from '@/object-types'
import MessageService from '@/services/message.service'
import CommonUtils from '@/utils/common.utils'
import { ApiUtils } from '@/utils/index'
import { getSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { PageButtonHeader } from 'next-sw360'
import { useRouter } from 'next/navigation'
import { ReactNode, useState } from 'react'
import ObligationForm from '../components/AddOrEditObligation'

function AddObligation(): ReactNode {
    const t = useTranslations('default')
    const router = useRouter()
    const [obligation, setObligation] = useState<Obligation>({
        title: '',
        text: '',
        obligationLevel: '',
        obligationType: '',
    } as Obligation)

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
            MessageService.error(`${t('Please fill in all fields before submitting')}.`)
            return
        }
        const response = await ApiUtils.POST('obligations', obligation, session.user.access_token)
        if (response.status == HttpStatus.CREATED) {
            MessageService.success(t('Obligation added successfully'))
            router.push('/admin/obligations')
        } else if (response.status == HttpStatus.CONFLICT) {
            MessageService.error(t('Obligation text has already taken'))
        } else {
            MessageService.error(t('Create obligation failed'))
        }
    }

    const headerButtons = {
        'Create Obligation': {
            type: 'primary',
            link: '/admin/obligations/add',
            name: t('Add Obligation'),
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

                    <ObligationForm
                        obligation={obligation}
                        setObligation={setObligation}
                    />
                </div>
            </div>
        </div>
    )
}

export default AddObligation
