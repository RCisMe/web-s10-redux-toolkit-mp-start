import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetQuotesQuery, useDeleteQuoteMutation, useToggleFakeMutation } from '../services/quotesApi'; // Assuming your RTK Query API service is set up correctly
import { setHighlightedQuote, toggleVisibility } from '../state/quotesSlice';

const Quotes = () => {
  const { data: quotes, isLoading, isError } = useGetQuotesQuery();
  const [deleteQuote] = useDeleteQuoteMutation();
  const [toggleFake] = useToggleFakeMutation();
  const displayAllQuotes = useSelector((state) => state.quotesState.displayAllQuotes);
  const highlightedQuote = useSelector((state) => state.quotesState.highlightedQuote);
  const dispatch = useDispatch();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading quotes</div>;

  const handleDelete = (quoteId) => {
    deleteQuote(quoteId); // Use RTK Query to delete
  };

  const handleToggleFake = (quote) => {
    toggleFake({ id: quote.id, apocryphal: !quote.apocryphal }); // Toggle fake status
  };

  return (
    <div id="quotes">
      <h3>Quotes</h3>
      <div>
        {quotes?.length === 0 ? (
          <p>No quotes here! Go write some.</p>
        ) : (
          quotes?.filter((qt) => {
            return displayAllQuotes || !qt.apocryphal;
          }).map((qt) => (
            <div
              key={qt.id}
              className={`quote${qt.apocryphal ? ' fake' : ''}${highlightedQuote === qt.id ? ' highlight' : ''}`}
            >
              <div>"{qt.quoteText}"</div>
              <div>- {qt.authorName}</div>
              <div className="quote-buttons">
                <button onClick={() => handleDelete(qt.id)}>DELETE</button>
                <button onClick={() => dispatch(setHighlightedQuote(qt.id))}>HIGHLIGHT</button>
                <button onClick={() => handleToggleFake(qt)}>
                  Mark as {qt.apocryphal ? 'Real' : 'Fake'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {!!quotes?.length && (
        <button onClick={() => dispatch(toggleVisibility())}>
          {displayAllQuotes ? 'HIDE' : 'SHOW'} FAKE QUOTES
        </button>
      )}
    </div>
  );
};

export default Quotes;
