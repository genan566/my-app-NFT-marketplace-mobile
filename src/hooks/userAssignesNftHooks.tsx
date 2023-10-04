import { View, Text } from 'react-native'
import React, { useCallback } from 'react'
import { CategoriesTrendingAPI } from '../APIs/CategoriesTrending'
import { CategoriesTrending } from '../types/CategorieTrendingType'
import { PaginatedDataNFT } from '../types/PaginatedData'
import { NftsAPI } from '../APIs/NftsAPI'

const userAssignesNftHooks = (): {
    data: PaginatedDataNFT;
    activePage: number;
    loadingData: boolean;
    initial_fetching_nfts: () => void;
    callingTheNestedData: (index: number) => void,
    prefixedPaginate: (it: number) => void,
    castedCount: number[],
    setCastedCount: React.Dispatch<React.SetStateAction<number[]>>
} => {

    const [nftsData, setnftsData] = React.useState<PaginatedDataNFT>({} as PaginatedDataNFT)

    const [castedCount, setCastedCount] = React.useState<number[]>([])
    const [activePage, setActivePage] = React.useState(1)
    const [loadingData, setLoadingData] = React.useState(false)


    const callingTheNestedData = (index: number) => {

        let resNFTs = new NftsAPI()
        setLoadingData(true)
        setActivePage(index)
        resNFTs.get_all_nfts(
            index).then(data => {
                setLoadingData(false)
                setnftsData(data)
            })

    }

    const prefixedPaginate = (it: number) => {

        setLoadingData(true)
        let respFaqs = new NftsAPI()
        setActivePage(it)
        respFaqs.get_all_nfts
            (it).then(data => {
                setLoadingData(false)
                setnftsData(data)
            })
    }

    const initial_fetching_nfts = () => {
        setLoadingData(true)
        let resNFTs = new NftsAPI()
        resNFTs.get_all_nfts().then(data => {
            setnftsData(data)
            setLoadingData(false)
        })
    }


    React.useEffect(() => {
        initial_fetching_nfts()
    }, [])

    React.useEffect(() => {
        if (nftsData.count !== 0) {
            let calculatedNumbersPage = parseInt(((nftsData.count) / 10).toFixed(0))
            let check_Can_add_Or_Not = (calculatedNumbersPage * 10) >= nftsData.count

            if (check_Can_add_Or_Not) {
                setCastedCount(Array.from(Array(calculatedNumbersPage).keys()).map(i => i + 1))
            } else {
                !Number.isNaN(calculatedNumbersPage) && setCastedCount(Array.from(Array((calculatedNumbersPage + 1)).keys()).map(i => i + 1))
            }
        }
        else {
            setCastedCount([])
        }

    }, [nftsData.count])

    return (
        {
            data: nftsData,
            activePage,
            loadingData,
            initial_fetching_nfts,
            callingTheNestedData,
            prefixedPaginate,
            castedCount, setCastedCount,
        }
    )
}

export default userAssignesNftHooks