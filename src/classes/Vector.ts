import { logger } from "../helpers/logger"

export class Vector2 {
    public x: number
    public y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    public sqrMagnitude(): number {
        return Math.pow(this.x, 2) + Math.pow(this.y, 2)
    }
    public magnitude(): number {
        return Math.sqrt(this.sqrMagnitude())
    }

    public add(vector: Vector2): Vector2 {
        return new Vector2(this.x + vector.x, this.y + vector.y)
    }
    public sub(vector: Vector2): Vector2 {
        return new Vector2(this.x - vector.x, this.y - vector.y)
    }
    public dot(vector: Vector2): number {
        return this.x * vector.x + this.y * vector.y
    }
    public static angle(v1: Vector2, v2: Vector2): number {
        let cosAngle = v1.dot(v2) / (v1.magnitude() * v2.magnitude())
        return Math.acos(cosAngle)
    }
}

export class Vector3 extends Vector2 {
    z: number

    constructor(x: number, y: number, z: number) {
        super(x, y)
        this.z = z
    }

    public sqrMagnitude(): number {
        return super.sqrMagnitude() + Math.pow(this.z, 2)
    }
    public dot(vector: Vector3): number {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z
    }
    public add(vector: Vector3): Vector3 {
        return new Vector3(this.x + vector.x, this.y + vector.y, this.z + vector.z)
    }
    public sub(vector: Vector3): Vector3 {
        return new Vector3(this.x - vector.x, this.y - vector.y, this.z - vector.z)
    }
    public static angle(v1: Vector3, v2: Vector3): number {
        let v1Dotv2 = v1.dot(v2)
        let v1Length = v1.magnitude()
        let v2Length = v2.magnitude()

        let cosAngle = v1.dot(v2) / (v1.magnitude() * v2.magnitude())
        logger.info(` ${v1Dotv2}  ${v1Length}  ${v2Length}`)
        return Math.acos(cosAngle) * 180 / Math.PI
    }
}