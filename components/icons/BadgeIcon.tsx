
import React from 'react';

export const BadgeIcon: React.FC<{ className?: string, fill?: string }> = ({ className, fill = "currentColor" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill={fill} className={className}>
        <path fillRule="evenodd" d="M10 2a.75.75 0 01.683.447l1.75 3.555a.75.75 0 00.56.418l3.92.57a.75.75 0 01.416 1.28l-2.836 2.764a.75.75 0 00-.215.664l.67 3.903a.75.75 0 01-1.088.791L10 13.347l-3.518 1.85a.75.75 0 01-1.088-.79l.67-3.903a.75.75 0 00-.215-.665L2.016 8.27a.75.75 0 01.416-1.28l3.92-.57a.75.75 0 00.56-.418l1.75-3.555A.75.75 0 0110 2z" clipRule="evenodd" />
    </svg>
);
