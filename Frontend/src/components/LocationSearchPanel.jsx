const LocationSearchPanel = ({ suggestions, setPanelOpen , setVehiclePanel , setPickup , setDestination , activeField }) => {

    const handleSuggestionClick = (suggestion) => {
        if (activeField === 'pickup') {
            setPickup(suggestion)
        } else if (activeField === 'destination') {
            setDestination(suggestion)
        }
    }

    console.log(suggestions)

    return (
        <div className="p-4 bg-white  mt-6 shadow-lg max-w-md mx-auto max-h-[466px] overflow-y-auto relative ">
            {/* Display fetched suggestions */}
            {
                suggestions.map((elem, idx) => (
                    <div key={idx} onClick={() => handleSuggestionClick(elem)} className='flex h-full w-full gap-4 border-2 px-5 mt-10 p-2 mb-3 border-gray-50 hover:bg-gray-50 active:border-black transition-all duration-200 cursor-pointer rounded-xl items-center my-2 justify-start shadow-sm hover:shadow-md'>
                        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full text-blue-600'><i className="ri-map-pin-fill"></i></h2>
                        <h4 className='font-medium text-gray-700 hover:text-gray-900'>{elem}</h4>
                    </div>     
                ))
            }
        </div>
    )
}

export default LocationSearchPanel