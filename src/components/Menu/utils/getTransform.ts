/**
 * Positioning Stuff
 */
function getTransform(progress: number, radius: number, index: number, totalItems: number) {
    const value = (index / totalItems) * progress;

    const x = radius * Math.cos(Math.PI * 2 * (value - 0.25));
    const y = radius * Math.sin(Math.PI * 2 * (value - 0.25));

    const scale = progress / 2 + 0.5;

    return `translate(${x}px, ${y}px) scale(${scale})`;
}

export default getTransform;
