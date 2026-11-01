const SearchInput = ({ query, onChangeHandler }) => {
    return (
        <div>
            <form>
                <h3>find countries</h3>
                <input type="text" onChange={onChangeHandler} value={query} />
            </form>
        </div>
    )
}

export default SearchInput