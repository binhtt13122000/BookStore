import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../store';
import * as BookStore from '../store/Books';

// At runtime, Redux will merge together...
type WeatherForecastProps =
    BookStore.BookState // ... state we've requested from the Redux store
    & typeof BookStore.actionCreators // ... plus action creators we've requested


class FetchData extends React.PureComponent<WeatherForecastProps> {
  // This method is called when the component is first added to the document
  public componentDidMount() {
    this.ensureDataFetched();
  }

  // This method is called when the route parameters change
  public componentDidUpdate() {
    this.ensureDataFetched();
  }

  public render() {
    return (
      <React.Fragment>
        <h1 id="tabelLabel">Weather forecast</h1>
        <p>This component demonstrates fetching data from the server and working with URL parameters.</p>
        {this.renderForecastsTable()}
      </React.Fragment>
    );
  }

  private ensureDataFetched() {
      this.props.requestBooks();
  }

  private renderForecastsTable() {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Summary</th>
          </tr>
        </thead>
            <tbody>
                {this.props.books.map((book: BookStore.Book) =>
                    <tr key={book.id}>
                        <td>{book.author}</td>
                        <td>{book.name}</td>
                        <td>{book.price}</td>
                        <td>{book.quantity}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

}

export default connect(
    (state: ApplicationState) => state.books, // Selects which state properties are merged into the component's props
    BookStore.actionCreators // Selects which action creators are merged into the component's props
)(FetchData as any); // eslint-disable-line @typescript-eslint/no-explicit-any
