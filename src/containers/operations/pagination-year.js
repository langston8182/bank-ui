import React, {Component} from 'react';
import {connect} from 'react-redux';
import {months as MONTHS} from "../months";
import {setCurrentMonth} from "../../actions/operations";

class PaginationYear extends Component {

    renderActivationClassName = month => {
        let className = "page-item";
        return month === this.props.currentMonth ? className + " active ": "";
    };


    renderPagination = () => {
        const {currentMonth} = this.props;

        return MONTHS.map((month, index) => (
            <li className={this.renderActivationClassName(index)} key={index}>
                <a className="page-link"
                   onClick={() => this.props.setCurrentMonth(index)}>{month}</a>
            </li>
        ));
    };

    render() {
        return (
            <div className="body_content">
                <ul className="pagination">
                    {this.renderPagination()}
                </ul>
            </div>
        );
    }
}

const mapDispatchToProps = {
    setCurrentMonth
};

const mapStateToProps = (state) => {
    return {
        currentMonth: state.operation.currentMonth
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PaginationYear);