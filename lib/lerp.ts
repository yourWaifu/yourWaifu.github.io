export default function lerp(v0: number, v1: number, progress: number): number {
    return v0 * ( 1 - progress ) + v1 * progress;
}