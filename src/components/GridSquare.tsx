interface props {
    color: string;
}

export default function GridSquare({ color }: props) {
    const classes = `grid-square color-${color}`;
    return <div className={classes} />;
}
