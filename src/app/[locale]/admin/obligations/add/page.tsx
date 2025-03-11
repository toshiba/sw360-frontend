'use client'
import { useTranslations } from 'next-intl'
import { PageButtonHeader } from 'next-sw360'
import { ReactNode, useState } from 'react'
import ObligationForm from '../components/AddOrEditObligation'
import { Obligation } from '@/object-types'

function AddObligation(): ReactNode {
    const t = useTranslations('default')
    const [obligation, setObligation] = useState<Obligation>({
        title: '',
        text: '',
        obligationLevel: '',
        obligationType: ''
    } as Obligation)

    const printOut = () => {
        console.log(obligation)
    }

    const headerButtons = {
        'Create Obligation': {
            type: 'primary',
            link: '/admin/obligations/add',
            name: t('Add Obligation'),
            onClick: printOut,
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

                    <ObligationForm obligation={obligation} setObligation={setObligation}/>
                </div>
            </div>
        </div>
    )
}

export default AddObligation
