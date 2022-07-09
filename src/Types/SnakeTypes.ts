export type FormData = {
    height: number
    width: number
    snakeSpeed: number
    stonesAmount: number
}
export type Coords = [number, number]
export type NullCoords = [null ,null]
export type FieldProps = {
    gridTemplateColumns: string
    gridTemplateRows: string
}
export type StoredData = {
    height: string
    width: string
    snakeSpeed: number
}
export type Directions = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight' | ' '
export interface SnakeState {
    height: number | null
    width: number | null
    divCoordinates: number[]
    fieldProps: FieldProps | null
    headCoords: Coords | NullCoords
    direction: Directions
    newPieceCoords: Coords | []
    snakeBody: Coords[]  
    prevPieceCoords: Coords | []
    isGameOver: boolean
    score: number
    showStartForm: boolean
    snakeSpeed: null | number
    maxSnakeSpeed: 30
    pause: boolean
    showRestart: boolean
    showSettings: boolean
    circlesCoords: Coords[] 
    stonesAmount: number | null
    rocksCoords: Coords[] 
    keyTiming: number | null
    aimCoords: Coords | []
    aimInitCoords: Coords | []
}