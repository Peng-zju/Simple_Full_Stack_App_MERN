import React, {Component} from 'react'
import ReactTable from 'react-table'
import styled from "styled-components";
import apis from '../api'

//import 'react-table/react-table.css'
import 'react-table/react-table.css'
//warpper to leave padding for table
const Wrapper = styled.div
`
    padding: 0 40px 40px 40px;
`
const Update = styled.div.attrs({
    className:'text-success'
})`
    color: #FFEBE8
    cursor: pointer
`
const Delete = styled.div.attrs({
    className:'text-danger'
})`
    color: #ff0000
    cursor: pointer
`

class UpdateMovie extends Component {
    updateMovie = event => {
        event.preventDefault()

        window.location.href = `/movies/update/${this.props.id}`
    }

    render() {
        return (
            <Update onClick={this.updateMovie}>
                Update
            </Update>
        )
    }
}



class DeleteMovie extends Component{
    deleteUser = event =>{
        event.preventDefault()
        if(
            window.confirm(
                `Do you want to delete this movie?`
            )
        )
            //id passed by react-table
            apis.deleteMovieById(this.props.id)
            //refresh page to get latest data from server
            window.location.reload()
    }
    render(){
        return(
            <Delete onClick={this.deleteUser}>
                Delete
            </Delete>
        )
    }
}

class MoviesList extends Component {
    //constructor, set initial state (i.e. this component stores and shows movies data)
    constructor(props) {
        super(props);
        //always use this.state = {} to initialize, in other functions, use this.setState
        this.state = {
            movies: [],
            isLoading: false, //because request data is async, if not successful, tell reacttable by css this info
        }
    }

    //request data from server when component is rendered
   componentDidMount(){

        this.setState({
            isLoading: true,
        })

        console.log('inside componentDidMount')

        //use await to pause until success
         apis.getAllMovies()
            .then(response => {
                this.setState({
                    movies: response.data.data,
                    isLoading: false,
                })

            })
             .catch(err=>{
                 console.log(err)
             })

    }


    render() {
        const {movies, isLoading} = this.state
        console.log('TCL: MoviesList -> render -> movies', movies)

        //define columns format
        const columns = [
            {
                Header: 'ID',
                accessor: '_id',
                filterable: true,
            },
            {
                Header: 'Name',
                accessor: 'name',
                filterable: true,
            },
            {
                Header: 'Rating',
                accessor: 'rating',
                filterable: true,
            },
            {
                Header: 'Time',
                accessor: 'time',
                //props are just the data of response.data.data.time
                Cell: props => {
                    return(<span>{props.value.join(' / ')}</span>)},
            },
            {
                Header: 'Time Created',
                accessor: 'createdAt',
                filterable: false
            },
            {
                Header: '',
                accessor: '',
                //if accessor is empty, then prop is an object whose props.original is the response data from server
                Cell: props => {
                    return (
                        <span>
                            <DeleteMovie id={props.original._id}/>

                        </span>
                    )
                }
            },
            {
                Header: '',
                accessor: '',
                //if accessor is empty, then prop is an object whose props.original is the response data from server
                Cell: props => {
                return (
                <span>
                <UpdateMovie id={props.original._id}/>

                </span>
                )
            }
            }
        ]

        //if no movie, do not show table, ignore this feature now

        let showTable = true
        if (!movies.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={movies}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                        className="-striped -highlight text-center"
                    />
                )}
            </Wrapper>
        )
    }
}
export default MoviesList