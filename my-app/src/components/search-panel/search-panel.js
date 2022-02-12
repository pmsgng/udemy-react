import './search-panel.css';
import { Component } from 'react';

class SearchPanel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            term: '',
        }
    }

    onUpdateSearch = (e) => {  // локальная функция
        const term = e.target.value;
        this.setState({term: term})
        this.props.onUpdateSearch(term)  // функция приходит через пропс
    }
    render() {
        return (
            <input type="text" 
            className="form-control search-input" 
            placeholder="Найти сотрудника"
            value={this.state.term}
            onChange={this.onUpdateSearch}/>
        )
    }
}

export default SearchPanel;