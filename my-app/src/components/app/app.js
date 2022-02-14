import { Component } from 'react';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';


class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'Alex C.', salary: 800, increase: true, rise: true , id:1,},
                {name: 'Jhon V.', salary: 3000, increase: true, rise: false , id:2,},
                {name: 'Alexander M.', salary: 5000, increase: false, rise: false , id:3,},
                {name: 'Vadim K.', salary: 9000, increase: false, rise: false , id:4,},
            ],
            term: '',
            filter: 'all',
        }
        this.maxId = 5
    }

    onSalaryChange = (e) => {
        this.setState(({data}) => {
            const newSalary = e.target.value
            
            return {
                data: data.forEeach(item => item.salary = newSalary)
            }
        })
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            // const index = data.findIndex((elem) => elem.id === id);
            // const before = data.slice(0, index);
            // const after = data.slice(index + 1)
            // const newArr = [...before,...after]

            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            rise: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem]
            return {
                data: newArr
            }
        })
    }

    onToggleIncrease = (id) => {
        // console.log(`Increase this ${id}`)
        // this.setState(({data}) => {
        //     const index = data.findIndex(elem => elem.id === id)

        //     const old = data[index]
        //     const newItem = {...old, increase: !old.increase}
        //     const newArr = [...data.slice(0,index),newItem, ...data.slice(index + 1)]

        //     return {
        //         data: newArr
        //     }
        // })
        this.setState(({data}) => ({
            data: data.map(item => { // возвращает новый массив 
                if(item.id === id) {  
                    return {...item, increase: !item.increase}
                }
                return item;  
            })
        }))
    }

    onToggleProp = (id,prop) => {
        this.setState(({data}) => ({
            data: data.map(item => { 
                if(item.id === id) {  
                    return {...item, [prop]: !item[prop]}
                }
                return item;  
            })
        }))
    }

    searchEmp = (items, term) => {
        if(term.length === 0 ){
            return items;
        }
        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term: term});
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise': 
                return items.filter(item => item.rise);   // !return if item.rise true
            case 'moreThen1000': 
                return items.filter(item => item.salary > 1000)
            default:
                return items
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter:filter})
    }
    render () {
        const {data,term,filter} = this.state;
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmp(data, term),filter);  // комбинируем, фильтруем отфильтрованный массив
        return (                                                                 // searchEmp === отфильтрованный data
            <div className="app">
                <AppInfo employees={employees} increased={increased}/>
    
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>
                <EmployeesList 
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                    onSalaryChange={this.onSalaryChange}/>
                <EmployeesAddForm onAdd={this.addItem}/>
    
            </div>
        );
    }

}

export default App;