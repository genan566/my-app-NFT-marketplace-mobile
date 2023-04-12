import { View, Text } from 'react-native'
import React, { useCallback } from 'react'
import { CategoriesTrendingAPI } from '../APIs/CategoriesTrending'
import { CategoriesTrending } from '../types/CategorieTrendingType'
import { PaginatedDataNFT } from '../types/PaginatedData'
import { NftsAPI } from '../APIs/NftsAPI'

const useNftHooks = (): {
    data: PaginatedDataNFT;
    activeCategoriesTrending: number;
    setActiveCategoriesTrending: React.Dispatch<React.SetStateAction<number>>;
    categoriesTrending: CategoriesTrending[];
    activePage: number;
    search: string;
    changingStateSearch: (entry: React.SetStateAction<string>) => void;
    loadingData: boolean;
    initial_fetching_nfts: () => void;
    callingTheNestedData: (index: number) => void,
    prefixedPaginate: (it: number) => void,
    castedCount: number[],
    setCastedCount: React.Dispatch<React.SetStateAction<number[]>>
} => {

    const [nftsData, setnftsData] = React.useState<PaginatedDataNFT>({} as PaginatedDataNFT)

    const [castedCount, setCastedCount] = React.useState<number[]>([])
    const [categoriesTrending, setCategoriesTrending] = React.useState<CategoriesTrending[]>([])
    const [activeCategoriesTrending, setActiveCategoriesTrending] = React.useState<number>(0)
    const [activePage, setActivePage] = React.useState(1)
    const [search, setSearch] = React.useState("")
    const [loadingData, setLoadingData] = React.useState(false)

    const changingStateSearch = (entry: React.SetStateAction<string>) => {
        setSearch(entry)
    }



    const callingTheNestedData = (index: number) => {
        if (activeCategoriesTrending) {
            setLoadingData(true)
            let resNFTs = new NftsAPI()
            setActivePage(index)
            resNFTs.get_all_nfts_paginate_by_categories(activeCategoriesTrending, index)
                .then(data => {
                    setLoadingData(false)
                    setnftsData(data)
                })
        }

        if (search) {
            let resNFTs = new NftsAPI()
            setLoadingData(true)
            setActiveCategoriesTrending(0)
            setActivePage(index)
            resNFTs.get_all_nfts_paginate_by_search(search, index)
                .then(data => {
                    setLoadingData(false)
                    setnftsData(data)
                })
        }

        else {
            let resNFTs = new NftsAPI()
            setLoadingData(true)
            setActivePage(index)
            resNFTs.get_all_nfts(
                index).then(data => {
                    setLoadingData(false)
                    setnftsData(data)
                })
        }
    }

    const prefixedPaginate = (it: number) => {
        if (activeCategoriesTrending) {
            setLoadingData(true)

            let respFaqs = new NftsAPI()
            setActivePage(it)
            respFaqs.get_all_nfts_paginate_by_categories(activeCategoriesTrending, it)
                .then(data => {
                    setLoadingData(false)
                    setnftsData(data)
                })

        }

        if (search) {
            setActiveCategoriesTrending(0)
            setLoadingData(true)
            let respFaqs = new NftsAPI()
            setActivePage(it)
            respFaqs.get_all_nfts_paginate_by_search(search, it)
                .then(data => {
                    setLoadingData(false)
                    setnftsData(data)
                })
        }

        else {
            setLoadingData(true)
            let respFaqs = new NftsAPI()
            setActivePage(it)
            respFaqs.get_all_nfts
                (it).then(data => {
                    setLoadingData(false)
                    setnftsData(data)
                })
        }

    }

    const callBackForSearch = useCallback(() => {
        setLoadingData(true)
        setActiveCategoriesTrending(0)
        let resNFTs = new NftsAPI()
        search.length !== 0 ? resNFTs
            .get_filtered_by_search_nfts(search)
            .then(data => {
                setnftsData(data)
                setLoadingData(false)
                setActivePage(1)
            }) :
            initial_fetching_nfts()
    }, [search])

    const initial_fetching_nfts = () => {
        setLoadingData(true)
        let resNFTs = new NftsAPI()
        resNFTs.get_all_nfts().then(data => {
            setnftsData(data)
            setLoadingData(false)
        })
    }


    const activeCategorieFilteringCallbacks = React.useCallback(() => {
        if (activeCategoriesTrending !== 0) {
            setLoadingData(true)
            let resNFTs = new NftsAPI()
            resNFTs
                .get_filtered_by_trendingIDs_nfts(activeCategoriesTrending)
                .then(data => {
                    setnftsData(data)
                    setLoadingData(false)
                    setActivePage(1)
                })
        } else
            initial_fetching_nfts()
    }, [activeCategoriesTrending])

    React.useEffect(() => callBackForSearch, [callBackForSearch])

    React.useEffect(() => {
        initial_fetching_nfts()
        let categories_trendings = new CategoriesTrendingAPI()
        categories_trendings.get_all_categories().then(data => {
            setCategoriesTrending(data.results)
        })
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

    React.useEffect(() => {
        activeCategorieFilteringCallbacks()
    }, [activeCategorieFilteringCallbacks])

    return (
        {
            data: nftsData,
            activeCategoriesTrending,
            setActiveCategoriesTrending,
            categoriesTrending,
            activePage,
            search,
            changingStateSearch,
            loadingData,
            initial_fetching_nfts,
            callingTheNestedData,
            prefixedPaginate,
            castedCount, setCastedCount
        }
    )
}

export default useNftHooks