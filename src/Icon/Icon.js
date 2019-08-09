import React from 'react';

export default class Icon extends React.Component {
    get iconSize() {
        const { size } = this.props;
        const sizes = {
            small: '32',
            medium: '64',
            large: '128',
        };

        return sizes[size || 'small'];
    }

    render() {
        const { weatherType } = this.props;

        return (
            <i className={`wu wu-black wu-${this.iconSize} wu-${weatherType}`} />
        );
    }
}
