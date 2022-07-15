import hash from 'object-hash';

export default function getRouteToken(path: string, ipAddress: string, userAgent: string) {
    return hash({
        path,
        ipAddress,
        userAgent,
    });
}
